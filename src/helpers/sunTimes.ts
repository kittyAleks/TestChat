import axios from 'axios';

const API_KEY = '6b590eb2647d31b082f4c6a423565391';

export const getSunTimes = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`,
    );
    const {sunrise, sunset} = response.data.sys;
    return {sunrise, sunset};
  } catch (error) {
    console.error('Error fetching sun times:', error);
    return {sunrise: null, sunset: null};
  }
};
