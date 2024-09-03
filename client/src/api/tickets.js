import axiosInstance from '.';

export const getTicketById = async (id) => {
  try {
    const response = await axiosInstance.get(`/issues/${id}`);
    return response.data;
  } catch (error) {
    console.log('getTicketById -> error:', error);
  }
};

export const updateTicketById = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/issues/${id}`, data);
    return response.data;
  } catch (error) {
    console.log('updateTicketById -> error:', error);
  }
};

export const createNewTicket = async (data) => {
  try {
    const response = await axiosInstance.post(`/issues`, data);
    return response.data;
  } catch (error) {
    console.log('createNewTicket -> error:', error);
  }
};

export const deleteTicketById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/issues/${id}`);
    return response.data;
  } catch (error) {
    console.log('deleteTicketById -> error:', error);
  }
};
