function identifyProvider(mobileNumber) {

    if (/^07[0123456789]\d{7}$/.test(mobileNumber)) {

      if (mobileNumber.startsWith('070')) {
        return 'Mobitel';
      } else if (mobileNumber.startsWith('071')) {
        return 'Mobitel';
      } else if (mobileNumber.startsWith('072')) {
        return 'Hutch';
      } else if (mobileNumber.startsWith('073')) {
        return 'Dialog';
      } else if (mobileNumber.startsWith('074')) {
        return 'Dialog';
      } else if (mobileNumber.startsWith('075')) {
        return 'Airtel';
      } else if (mobileNumber.startsWith('076')) {
        return 'Dialog';
      } else if (mobileNumber.startsWith('077')) {
        return 'Dialog';
      } else if (mobileNumber.startsWith('078')) {
        return 'Hutch';
      } else {
        return 'Invalid Number';
      }
    } else {
      return 'Wrong Number Format';
    }
  }
  export default identifyProvider;