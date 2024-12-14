const nextConfig = {
  reactStrictMode: true,
  async exportPathMap() {
    return {
      '/': { page: '/login' },
    };
  },
};

export default nextConfig;