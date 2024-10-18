import { Mobile } from "../modules/MobileManager";

const API_URL = 'http://localhost:8080/api/v1/smartphones';


const request = async (url: string, options: RequestInit = {}): Promise<any> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Error: ${response.status} - ${errorMessage}`);
  }
  return response.status !== 204 ? await response.json() : null;
};


const allMobiles = async (): Promise<Mobile[]> => {
    try {
      const result = await request(`${API_URL}/mobileAll`);
      return result ?? []; 
    } catch (error) {
      console.error('Error fetching mobiles:', error);
      throw error;
    }
  };


const createMobile = async (mobile: Mobile): Promise<Mobile> => {
  console.log('%c⧭ Creating Mobile:', 'color: #00aa1c', mobile);
  return request(`${API_URL}/mobileCreate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mobile),
  });
};


const updateMobile = async (id: number, mobile: Mobile): Promise<void> => {
  await request(`${API_URL}/mobileUpdate/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mobile),
  });
};


const deleteMobile = async (id: number): Promise<void> => {
  await request(`${API_URL}/mobileDelete/${id}`, {
    method: 'DELETE',
  });
};


export const MobileService = {
  allMobiles,
  createMobile,
  updateMobile,
  deleteMobile,
};
