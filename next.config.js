/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["lc3xt"],
    experimental: {
        serverActions: {
            bodySizeLimit: "10mb"
        }
    }
};

// Merge MDX config with Next.js config
export default nextConfig;
