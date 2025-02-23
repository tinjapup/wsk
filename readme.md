# web-sovelluskehitys

Authentication properties:
- Users must be logged in to add, update, or delete their own entries and account information. They are only allowed to manage their own user data based on their unique user_id.
- Admin users have elevated privileges, including the ability to view all users' information and manage accounts and entries for any user_id. Admins can delete any user accounts or entries, but cannot delete their own admin account.
- Only admins can delete any user accounts, but an admin's own account is protected from deletion.
