import '../styles/UserCrud.css'

export default function UserCrud() {
    return (
        <div className='crud-card'>
            <div className="user-search-container">
                <form >
                    <div className="filtro-buttons">
                        <button type='button'>id</button>
                        <button type='button'>nombre</button>
                        <button type='button'>email</button>
                    </div>
                    <input type="text" placeholder='tipo' required name='buscar' id='search-input'/>
                    <button type='submit'>Buscar</button>
                </form>
            </div>
            <div className="user-table-container"></div>
        </div>
    );
}