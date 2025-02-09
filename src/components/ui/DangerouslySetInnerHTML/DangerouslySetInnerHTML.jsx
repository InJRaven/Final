const DangerouslySetInnerHTML = ({content, className}) => {
    return <div dangerouslySetInnerHTML={ {__html: content}} className={className}/>
}

export default DangerouslySetInnerHTML;