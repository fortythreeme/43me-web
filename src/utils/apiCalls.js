import axios from 'axios';
import moment from 'moment';

export const TaskList = async (authToken, data) => {
  try {
    // console.log(authToken,data,'data')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_APP}list`, {
      params: data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    //  console.log(response,'respon')
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const StripePay = async () => {
  // try {
  //   let data = {
  //     price: "price_1OrqRfKo9v7E5i0A90apaFyT"
  //   }
  //   let config = {
  //     method: 'post',
  //     maxBodyLength: Infinity,
  //     url: 'http://127.0.0.1:3005/v1/stripe',
  //     headers: { 
  //       'Content-Type': 'application/json'
  //     },
  //     data : data
  //   };
  //   const response = await axios.request(config);
  //     // , {
  //     //   headers: {
  //     //     Authorization: `Bearer ${authToken}`,
  //     //   },
  //     // }
  //   console.log(response, 'Stripe');
  //   return response;
  // } catch (error) {
  //   console.log(error);
  // }
  let data = JSON.stringify({
    "price": "price_1OrqRfKo9v7E5i0A90apaFyT"
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.fortythree.me/v1/stripe',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  try {
    const response = await axios.request(config);
    // console.log(response, 'response');
    return response;
  } catch (error) {
    console.log(error);
  }
  // axios.request(config)
  // .then((response) => {
  //   console.log(response,'response')
  //   return response
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
};
export const SendNotify = async (fcm, title, body) => {
  let data = {
    fcmToken: fcm,
    // 'dd4sCXxOhD1XdO53AJrhNq:APA91bFAiuTj86o_Ld-Q32u0uozmDPv3UbCgXDHPONf0UEizVWObqyRoXzwE097YEPL_ZCXgA-IFrNKGu_ZXBZ7677ElgD-qFAW-H4N-DOEWagBzX7R9SuVXIdL21TjYYxzwFgKG33zU',
    title: title,
    body: body,
  };
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_APP}notification-send`,
    data: data,
  };
  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
export const StripeStatus = async (id) => {
  let data = {
    // "price": "price_1OrqRfKo9v7E5i0A90apaFyT"
    sessionId: id,
  };

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_APP}webhook`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    // console.log(response, 'response');
    return response.data;
  } catch (error) {
    console.log(error);
  }
  // axios.request(config)
  // .then((response) => {
  //   console.log(response,'response')
  //   return response
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
};
export const UpdateSubscription = async (authToken, data) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_APP}web-subscription`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    // console.log(response, 'response');
    return response.data;
  } catch (error) {
    console.log(error);
  }
  // axios.request(config)
  // .then((response) => {
  //   console.log(response,'response')
  //   return response
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
};
export const EditTask = async (authToken, id, data) => {
  try {
    console.log(authToken, data, 'data')
    const response = await axios.put(`${process.env.NEXT_PUBLIC_APP}task/${id}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response, 'editTask');
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const MoveTask = async (authToken, id, data) => {
  try {
    // console.log(authToken,data,'data')
    const response = await axios.put(`${process.env.NEXT_PUBLIC_APP}task-move/${id}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(response, 'moveTask');
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const ResendCode = async (data) => {
  try {
    // console.log(authToken,data,'data')
    const response = await axios.post(`${process.env.NEXT_PUBLIC_APP}auth/resend_token`, data, {
    });
    console.log(response, 'ResendCode');
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const ForgotPassWord = async (data) => {
  try {
    // console.log(authToken,data,'data')
    const response = await axios.post(`${process.env.NEXT_PUBLIC_APP}auth/forgot-password`, data, {
    });
    console.log(response, 'ForgotCode');
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const ActiveAccount = async (data) => {
  try {
    // console.log(authToken,data,'data')
    const response = await axios.post(`${process.env.NEXT_PUBLIC_APP}auth/activation`, data, {
    });
    console.log(response, 'Activation');
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const Update = async (authToken,data) => {
  try {
    // console.log(authToken,data,'data')
    const response = await axios.put(`${process.env.NEXT_PUBLIC_APP}user`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(response, 'UpdateProfile');
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const GetUser = async (authToken) => {
  try {
    // console.log(authToken,data,'data')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_APP}user`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(response, 'GetProfile');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdatePassword = async (authToken,data) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_APP}auth/change-password`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(response, 'UpdatePassword');
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const RemoveTask = async (authToken, task) => {
  try {
    let id = task._id;
    if (task.baseTask_id) {
      id = task.baseTask_id;
    }
    let data = {
      date: moment(task.date).format('YYYY-MM-DD')
    }
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_APP}task/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      data: data
    };
    const response = await axios.request(config);
    console.log(response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const MarkAsDone = async (authToken, id, data) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_APP}task-done/${id}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(response, 'MarkAsDone');
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const AddNewTask = async (authToken, data) => {
  try {
    console.log(authToken, data, 'data')
    const response = await axios.post(`${process.env.NEXT_PUBLIC_APP}task`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(response, 'AddTask');
    return response;
  } catch (error) {
    console.log(error);
  }
};