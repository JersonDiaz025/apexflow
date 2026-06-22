import LayoutPages from '@/layouts/LayoutPages';

const PageConfig = () => {
    return (
        <LayoutPages
            title='Configuración'
            subTitle='Gestiona las configuraciones generales de ApexFlow'
        >
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 px-1'>
                Configuracion
            </div>
        </LayoutPages>
    );
};

export default PageConfig;
