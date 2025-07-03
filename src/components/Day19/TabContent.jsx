import React, { useRef } from 'react'

const TabContent = ({tab,tabopen,handletabopen}) => {
    const tabRef = useRef(null);
  return (
    <div ref={tabRef}
    style={{maxHeight:tabopen ? `${tabRef.current.scrollHeight}px` :""}}
    
    className={`${tabopen ? "":"max-h-0" } overflow-hidden transition-all duration-300 `} >
      
        <strong className={``}>{tab.content}</strong>
      
    </div>
  )
}

export default TabContent
