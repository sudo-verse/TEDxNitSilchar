import './tedx-loader.css';

export const TedxLoader = () => {
    return (
        <div className='tedx-loader'>
            <div className='ring'></div>

            <div className='brand'>
                <span className='ted'>TED</span>
                <span className='x'>x</span>
                <span className='college'>NITSilchar</span>
            </div>

            <p className='tagline'>Ideas Worth Spreading</p>
        </div>
    );
};
