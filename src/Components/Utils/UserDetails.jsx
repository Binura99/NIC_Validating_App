import React from 'react'

export const UserDetails = () => {

    useEffect(() => {
        const [listOfUsers, setListOfUsers] = useState([]);
    
        axios.get("http://localhost:3001/auth").then((response) => {
          if (Array.isArray(response.data)) {
            setListOfUsers(response.data);
          } else {
            console.error("Response data is not an array:", response.data);
          }
        });
      }, []);
  return (
    <div>
        
    </div>
  )
}
