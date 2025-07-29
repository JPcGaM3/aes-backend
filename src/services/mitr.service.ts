import axios from "axios";

const MitrConfig = {
	authApiUrl: process.env.AUTH_API_URL,
	tokenApiUrl: process.env.TOKEN_API_URL,
	tenantId: process.env.TENANT_ID,
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	scope: process.env.SCOPE,
	subscriptionKey: process.env.SUBSCRIPTION_KEY,
};

export const MitrService = {
	token: async () => {
		try {
			const formData = new URLSearchParams({
				client_id: MitrConfig.clientId as string,
				client_secret: MitrConfig.clientSecret as string,
				scope: MitrConfig.scope as string,
				grant_type: "client_credentials",
			});

			const response = await axios.post(
				`${MitrConfig.tokenApiUrl}/${MitrConfig.tenantId}/oauth2/v2.0/token`,
				formData.toString(),
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}
			);

			return response.data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				throw new Error(
					`Failed to fetch token: ${error.response?.status} ${
						error.response?.statusText || error.message
					}`
				);
			}
			throw error;
		}
	},

	authen: async (
		token: string,
		password: string,
		username?: string,
		email?: string
	) => {
		try {
			const response = await axios.post(
				`${MitrConfig.authApiUrl}/userinfo/api/v2/authen/profile`,
				{
					...(username && { username: username }),
					...(email && { email: email }),
					password: password,
				},
				{
					headers: {
						"Content-Type": "application/json",
						"Ocp-Apim-Subscription-Key": MitrConfig.subscriptionKey as string,
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const errorDetails = error.response?.data
					? ` - Details: ${JSON.stringify(error.response.data)}`
					: "";

				throw new Error(
					`Failed to authenticate: ${error.response?.status} ${
						error.response?.statusText || error.message
					}${errorDetails}`
				);
			}
			throw error;
		}
	},

	getProfile: async (token: string, username?: string, email?: string) => {
		try {
			const response = await axios.post(
				`${MitrConfig.authApiUrl}/userinfo/api/v2/profile`,
				{
					...(username && { username: username }),
					...(email && { email: email }),
				},
				{
					headers: {
						"Content-Type": "application/json",
						"Ocp-Apim-Subscription-Key": MitrConfig.subscriptionKey as string,
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const errorDetails = error.response?.data
					? ` - Details: ${JSON.stringify(error.response.data)}`
					: "";

				throw new Error(
					`Failed to authenticate: ${error.response?.status} ${
						error.response?.statusText || error.message
					}${errorDetails}`
				);
			}
			throw error;
		}
	},

	getProfileAD: async (token: string, username?: string, email?: string) => {
		try {
			const response = await axios.post(
				`${MitrConfig.authApiUrl}/userinfo/api/v2/profile/ad`,
				{
					...(username && { username: username }),
					...(email && { email: email }),
				},
				{
					headers: {
						"Content-Type": "application/json",
						"Ocp-Apim-Subscription-Key": MitrConfig.subscriptionKey as string,
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const errorDetails = error.response?.data
					? ` - Details: ${JSON.stringify(error.response.data)}`
					: "";

				throw new Error(
					`Failed to authenticate: ${error.response?.status} ${
						error.response?.statusText || error.message
					}${errorDetails}`
				);
			}
			throw error;
		}
	},
};
