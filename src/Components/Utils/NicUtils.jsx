function extractInfoFromNIC(nic) {
    if (!nic) {
        return {
          dob: '',
          gender: '',
          age: '',
          error: 'Enter a NIC number!',
        };
      }
    
      // Remove spaces and convert to uppercase
      nic = nic.replace(/\s/g, '').toUpperCase();
  
    if (nic.length === 10) {
      // Old format NIC
      if (!/^[0-9]{9}[VX]{1}$/i.test(nic)) {
        return {
          dob: '',
          gender: '',
          age: '',
          error: 'Invalid NIC number!',
        };
      }
  
      const year = new Date().getFullYear();
      const birthYear = parseInt(nic.substring(0, 2));
      const days = parseInt(nic.substring(2, 5)) - 1;
      const genderChar = nic.charAt(9);
      const gender = genderChar === 'V' ? 'Male' : 'Female';
      const dob = new Date(birthYear + 1900, 0);
      dob.setDate(dob.getDate() + days);
      const age = year - (birthYear + 1900);
  
      return {
        dob: dob.toISOString().split('T')[0],
        gender,
        age: age.toString(),
        error: '',
      };
    } else if (nic.length === 12) {
      // New format NIC
      if (!/^[0-9]{12}$/i.test(nic)) {
        return {
          dob: '',
          gender: '',
          age: '',
          error: 'Invalid NIC number!',
        };
      }
  
      const year = new Date().getFullYear();
      const birthYear = parseInt(nic.substring(0, 4));
      const days = parseInt(nic.substring(4, 7)) - 1;
      const genderChar = nic.charAt(11);
      const gender = genderChar === 'V' ? 'Female' : 'Male';
      const dob = new Date(birthYear, 0);
      dob.setDate(dob.getDate() + days);
      const age = year - birthYear;
  
      return {
        dob: dob.toISOString().split('T')[0],
        gender,
        age: age.toString(),
        error: '',
      };
    } else {
      return {
        dob: '',
        gender: '',
        age: '',
        error: 'Invalid NIC number!',
      };
    }
  }
  // 720133180v
  export default extractInfoFromNIC;
  