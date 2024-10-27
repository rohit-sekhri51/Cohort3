


const Card = ({ children }) => {
    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            margin: '5px',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
            
        }}>
            {children}
        </div>
    );
};

export default Card;