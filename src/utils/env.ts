
const local_url='http://localhost:3000'
const local_pb = "http://127.0.0.1:8090";

const web1_url = "https://tigawanna-pocketbase.fly.dev"
const vercel_url ="https://devhub-brown.vercel.app";

// export const pb_url=web1_url
// export const main_url =vercel_url
console.log("pb_url ===",import.meta.env.VITE_PB_URL,import.meta.env.VITE_SITE_URL)

export const pb_url=import.meta.env.VITE_PB_URL
export const main_url = import.meta.env.VITE_SITE_URL

export const redirect_url=main_url+"/auth/redirect"
export const login_url = main_url+"/auth";



