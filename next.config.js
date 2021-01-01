module.exports = {
  images: {
    domains: ["cdn.discordapp.com"] /* KEEP THIS OTHERWISE IMAGES WILL NOT LOAD */,
  },
  async redirects() {
    return [
      {
        source: "/add",
        destination:
          "https://discord.com/oauth2/authorize?client_id=740489089005912146&scope=bot&permissions=1945632119",
        permanent: true,
      },
      {
        source: "/support",
        destination: "https://discord.gg/SgCABjZ3cy",
        permanent: true,
      },
      {
        source: "/logout",
        destination: "/api/auth/logout",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/api/auth/login",
        permanent: true,
      },
    ];
  },
};
