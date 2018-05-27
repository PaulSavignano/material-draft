const ALIGNMENT_DATA_KEY = 'textAlignment'

const blockStyleFn = (block) => {
  
  console.log(block.getType())
  switch (block.getType()) {
    case 'left':
      return 'me-align-left';
    case 'center':
      return 'me-align-center';
    case 'right':
      return 'me-align-right';
    default:
      return;
  }   
}

export default blockStyleFn