# 🗄️ DriplyPay Database Guidelines

> **Critical:** Always follow these rules. One mistake can break the entire platform.

---

## 🚨 Database Safety Rules

### Golden Rules - NEVER BREAK THESE
1. **NEVER delete production data** without explicit approval and backup
2. **ALWAYS test migrations on local/staging first**
3. **ALWAYS use transactions** for multi-step operations
4. **NEVER use `DROP TABLE`** in production migrations
5. **ALWAYS backup before major schema changes**
6. **NEVER change primary keys** on existing tables
7. **ALWAYS use `wallet_method_id`** (NOT `payment_method_id`)

---

## 📊 Schema Standards

### Table Naming Conventions
```sql
-- ✅ CORRECT
profiles
wallet_methods  
social_links
analytics_events
vision_board_items
qr_codes

-- ❌ WRONG
profile
payment_methods  -- Use wallet_methods instead
socialLinks      -- Use snake_case not camelCase
```

### Column Naming Standards
```sql
-- ✅ CORRECT - Snake case for database
id, profile_id, wallet_method_id, created_at, updated_at, is_active, order_index

-- ❌ WRONG - No camelCase in database  
profileId, walletMethodId, createdAt, isActive, orderIndex
```

### Required Columns for All Tables
```sql
-- Every table MUST have these
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
created_at TIMESTAMPTZ DEFAULT NOW()
updated_at TIMESTAMPTZ DEFAULT NOW()

-- User-owned tables MUST have
profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE
```

---

## 🔐 Security Requirements

### Row Level Security (RLS)
```sql
-- ALWAYS enable RLS on new tables
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- ALWAYS create policies for user access
CREATE POLICY "Users can view their own data" 
ON table_name FOR SELECT 
USING (auth.uid()::text = profile_id::text);

CREATE POLICY "Users can update their own data" 
ON table_name FOR UPDATE 
USING (auth.uid()::text = profile_id::text);
```

### Sensitive Data Rules
- **NEVER store payment details** (card numbers, bank accounts)
- **NEVER store passwords** in plain text
- **ALWAYS validate URLs** before storing
- **NEVER store personal data** without encryption if required

---

## 🔄 Migration Best Practices

### Migration File Naming
```bash
# Format: YYYYMMDDHHMMSS_description.sql
20250714120000_add_wallet_methods_table.sql
20250714120001_create_qr_codes_system.sql
20250714120002_update_profiles_add_theme.sql
```

### Safe Migration Patterns
```sql
-- ✅ SAFE - Add new column with default
ALTER TABLE profiles 
ADD COLUMN theme TEXT DEFAULT 'clean';

-- ✅ SAFE - Create new table
CREATE TABLE IF NOT EXISTS new_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ✅ SAFE - Add index
CREATE INDEX CONCURRENTLY IF NOT EXISTS 
idx_wallet_methods_profile_id ON wallet_methods(profile_id);

-- ❌ DANGEROUS - Don't drop columns immediately
-- ALTER TABLE profiles DROP COLUMN old_column; -- DON'T DO THIS

-- ✅ SAFE - Deprecate first, drop later
-- 1. Remove from code
-- 2. Wait for deployment
-- 3. Then drop in separate migration
```

### Migration Checklist
- [ ] Test on local database first
- [ ] Backup production data
- [ ] Run migration during low-traffic period
- [ ] Monitor for errors
- [ ] Have rollback plan ready
- [ ] Update TypeScript types after migration

---

## 💾 Backup Strategy

### Automated Backups
```bash
# Supabase handles daily backups automatically
# But for critical changes, create manual backup:

# Before major migration
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Before data cleanup
pg_dump $DATABASE_URL --data-only > data_backup_$(date +%Y%m%d_%H%M%S).sql
```

### Manual Backup Requirements
- **Before any DROP operation**
- **Before bulk data updates**
- **Before schema changes affecting existing data**
- **Before production deployments**

---

## 📈 Performance Guidelines

### Query Optimization
```sql
-- ✅ GOOD - Use indexes for frequent queries
CREATE INDEX idx_analytics_profile_created 
ON analytics_events(profile_id, created_at);

-- ✅ GOOD - Limit large queries
SELECT * FROM analytics_events 
WHERE profile_id = $1 
ORDER BY created_at DESC 
LIMIT 100;

-- ❌ BAD - Avoid SELECT * on large tables
SELECT * FROM analytics_events; -- DON'T DO THIS

-- ✅ GOOD - Select only needed columns
SELECT event_type, created_at 
FROM analytics_events 
WHERE profile_id = $1;
```

### Index Strategy
```sql
-- Profile lookups (most common)
CREATE INDEX idx_profiles_username ON profiles(username);

-- Wallet methods per profile
CREATE INDEX idx_wallet_methods_profile_active 
ON wallet_methods(profile_id, is_active);

-- Analytics queries
CREATE INDEX idx_analytics_profile_type_date 
ON analytics_events(profile_id, event_type, created_at);

-- QR code lookups
CREATE INDEX idx_qr_codes_profile_type 
ON qr_codes(profile_id, link_type);
```

---

## 🔧 Common Operations

### Safe Data Updates
```sql
-- ✅ SAFE - Use transactions for multi-step updates
BEGIN;
  UPDATE profiles SET theme = 'ocean' WHERE id = $1;
  UPDATE wallet_methods SET is_active = true WHERE profile_id = $1;
COMMIT;

-- ✅ SAFE - Validate before bulk updates
SELECT COUNT(*) FROM profiles WHERE theme IS NULL;
-- If count looks reasonable, proceed:
UPDATE profiles SET theme = 'clean' WHERE theme IS NULL;
```

### Data Cleanup
```sql
-- ✅ SAFE - Soft delete first
UPDATE table_name SET is_active = false WHERE condition;

-- Wait, monitor, then hard delete if needed
DELETE FROM table_name WHERE is_active = false AND updated_at < NOW() - INTERVAL '30 days';
```

---

## 🚨 Emergency Procedures

### If Migration Fails
1. **STOP** - Don't run more commands
2. **Check logs** for error details
3. **Rollback if possible**
4. **Restore from backup** if necessary
5. **Fix migration** and test locally
6. **Re-run with fixed version**

### If Data Is Lost
1. **STOP all writes** to affected tables
2. **Check backup availability**
3. **Restore from most recent backup**
4. **Analyze what went wrong**
5. **Update procedures** to prevent repeat

---

## 📋 Pre-deployment Checklist

### Before ANY Database Change
- [ ] Backup created and verified
- [ ] Migration tested locally
- [ ] Migration tested on staging
- [ ] TypeScript types updated
- [ ] RLS policies reviewed
- [ ] Performance impact assessed
- [ ] Rollback plan documented
- [ ] Team notified of change

### After Database Change
- [ ] Migration completed successfully
- [ ] Application still functions
- [ ] No performance degradation
- [ ] Backup cleanup scheduled
- [ ] Documentation updated

---

## 🎯 Quick Reference

### Essential Commands
```sql
-- Check table structure
\d+ table_name

-- Check RLS policies
\d+ table_name

-- Check indexes
\di+ table_name

-- Check table sizes
SELECT schemaname,tablename,attname,n_distinct,correlation 
FROM pg_stats WHERE tablename = 'table_name';
```

### Emergency Contacts
- **Database Issues:** Check Supabase dashboard first
- **Migration Problems:** Revert and test locally
- **Data Loss:** Restore from backup immediately

---

**Remember:** The database is the heart of DriplyPay. Treat it with respect, test everything, and when in doubt, backup first. One careless command can bring down the entire platform.

**🔒 Core Rule: Better safe than sorry. Always backup, always test, never rush.**
