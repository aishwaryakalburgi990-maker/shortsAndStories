# Database Setup Guide

## Step 1: Check MySQL Installation

### Option A: Using Homebrew (Recommended)
```bash
# Install MySQL if not installed
brew install mysql

# Start MySQL service
brew services start mysql

# Connect to MySQL (no password by default)
mysql -u root
```

### Option B: Using MySQL Installer
If you installed MySQL using the official installer, you might have set a password during installation.

## Step 2: Create Database and User

Once connected to MySQL, run these commands:

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS shots_stories;

-- Create user (optional, for security)
CREATE USER IF NOT EXISTS 'shots_user'@'localhost' IDENTIFIED BY 'your_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON shots_stories.* TO 'shots_user'@'localhost';
FLUSH PRIVILEGES;

-- Show databases to confirm
SHOW DATABASES;

-- Exit MySQL
EXIT;
```

## Step 3: Update .env File

Based on your MySQL setup, update the DATABASE_URL in `.env`:

### If using root with no password:
```env
DATABASE_URL="mysql://root:@localhost:3306/shots_stories"
```

### If using root with password:
```env
DATABASE_URL="mysql://root:your_password@localhost:3306/shots_stories"
```

### If using custom user:
```env
DATABASE_URL="mysql://shots_user:your_password@localhost:3306/shots_stories"
```

## Step 4: Test Connection

```bash
# Test the connection
npx prisma db push

# If successful, seed the database
npm run db:seed
```

## Troubleshooting

### MySQL not found
```bash
# Check if MySQL is installed
which mysql

# If not found, install via Homebrew
brew install mysql
brew services start mysql
```

### Connection refused
```bash
# Check if MySQL is running
brew services list | grep mysql

# Start MySQL if not running
brew services start mysql
```

### Authentication failed
- Check your MySQL password
- Try connecting with: `mysql -u root -p`
- Update DATABASE_URL with correct credentials

### Port issues
- Default MySQL port is 3306
- Check if something else is using the port: `lsof -i :3306`