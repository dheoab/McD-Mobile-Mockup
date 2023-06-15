module.exports = {
  apps: [
    {
      name: "app",
      script: "./bin/www",
      env_production: {
        NODE_ENV: "production",
        DATABASE_URL:
          "postgresql://postgres:sgtkrotovoskyy@db.xwoxuatqzdpjxelxptzk.supabase.co:5432/postgres",
        PORT: 80,
        SECRET: "secret",
      },
    },
  ],
};
