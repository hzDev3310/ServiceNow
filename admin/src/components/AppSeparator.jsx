

const AppSeparator = ({ text = null , color = 'gray', ...otherProps }) => {
    if (text != null) {
        return (
            <div {...otherProps} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginBlock : 10}}>
                <div style={{ backgroundColor: color, height: 1, width: '50%' }} />
                <h1 style={{ color: color, fontSize: 16, textTransform: 'uppercase', margin: '0 8px' }}>{text}</h1>
                <div style={{ backgroundColor: color, height: 1, width: '50%' }} />
            </div>
        );
    } else {
        return <div {...otherProps} style={{ backgroundColor: color, height: 1, width: '100%', marginBlock : 10}}><h1>&nbsp;</h1></div>;
    }
};

export default AppSeparator;
