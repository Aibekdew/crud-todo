namespace TODO {
  type getResponse = {
    res: {
      id: number;
      title: string;
      description: string;
      image: string;
    }[];
  };
  type getRequest = void;

  type postResponse = {
    id: number;
    title: string;
    description: string;
    image: string;
  };

  type postRequest = {
    title: string;
    description: string;
    image: string;
  };

  type deleteResponse = {
    id: number;
    title: string;
    description: string;
    image: string;
  };

  type deleteRequest = number;

  type editResponse = {
    id: number;
    title: string;
    description: string;
    image: string;
  };
  type editRequest = {
    id: number;
    edited: {
      title: string;
      description: string;
      image: string;
    };
  };
}
