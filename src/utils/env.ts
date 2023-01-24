/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
// export const pb_url="https://pb.tigawanna.tech"

// export const redirect_url="https://pb.tigawanna.tech/redirect"
// export const login_url = "https://pb.tigawanna.tech/login";

const local_url = 'http://localhost:3000';
const local_pb = 'http://127.0.0.1:8090';
const fly_pb_url = 'https://tigawanna-pocketbase.fly.dev';

export const pb_url=fly_pb_url
// export const pb_url = local_pb;
// export const main_url =vercel_url
export const main_url = local_url;
export const redirect_url = `${main_url}/auth/redirect`;
export const login_url = `${main_url}/auth`;
