function formatDate(dateString) {
    const date = new Date(dateString);
  
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
  

    const formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;
  
    return formattedDate;
  }


  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      content = content.substring(0, maxLength) + '...';
    }
    return content;
  };
  


  export {formatDate, truncateContent}


