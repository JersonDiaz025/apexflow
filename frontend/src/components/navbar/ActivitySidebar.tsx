const ActivitySidebar = ({ isOpen }) => {
    return (
        <aside
            className={`border-l border-outline-variant bg-white transition-all duration-300 overflow-hidden flex flex-col ${isOpen ? 'w-80' : 'w-0'}`}
        >
            <div className='p-6 border-b border-outline-variant flex items-center justify-between min-w-[320px]'>
                <h2 className='font-bold text-on-surface uppercase tracking-wider text-xs'>
                    Activity Feed
                </h2>
                <span className='material-symbols-outlined text-on-surface-variant cursor-pointer text-[20px]'>
                    chevron_right
                </span>
            </div>

            <div className='flex-1 overflow-y-auto min-w-[320px] p-6 space-y-8'>
                {[
                    {
                        user: 'Alex',
                        action: 'moved',
                        target: 'Auth Module',
                        to: 'In Progress',
                        time: '14m ago',
                    },
                    {
                        user: 'Riley',
                        action: 'commented on',
                        target: 'API Docs',
                        note: 'Check latest schema',
                        time: '2h ago',
                    },
                ].map((item, idx) => (
                    <div key={idx} className='flex gap-4'>
                        <div className='w-10 h-10 rounded-full bg-surface-container-high flex-shrink-0' />
                        <div className='space-y-1'>
                            <p className='text-body-md text-on-surface'>
                                <span className='font-bold'>{item.user}</span> {item.action}{' '}
                                <span className='text-primary font-medium'>{item.target}</span>
                                {item.to && (
                                    <>
                                        {' '}
                                        to <span className='font-bold'>{item.to}</span>
                                    </>
                                )}
                            </p>
                            {item.note && (
                                <div className='bg-surface-container-lowest border border-outline-variant p-3 rounded-precision italic text-on-surface-variant text-body-sm mt-2'>
                                    "{item.note}"
                                </div>
                            )}
                            <p className='text-xs text-on-surface-variant uppercase font-medium'>
                                {item.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='p-4 border-t border-outline-variant min-w-[320px]'>
                <button className='w-full py-2 text-primary text-body-md font-bold hover:underline'>
                    View All History
                </button>
            </div>
        </aside>
    );
};

export default ActivitySidebar;
