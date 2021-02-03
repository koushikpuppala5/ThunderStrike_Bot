module.exports = {
    images: {
        domains: ["cdn.discordapp.com"] /* KEEP THIS OTHERWISE IMAGES WILL NOT LOAD */ ,
    },
    async redirects() {
        return [{
                source: "/add",
                destination: "https://discord.com/oauth2/authorize?client_id=740489089005912146&permissions=2146958711&redirect_uri=https%3A%2F%2Fdiscord.gg%2FSgCABjZ3cy&response_type=code&scope=identify%20connections%20guilds.join%20bot",
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