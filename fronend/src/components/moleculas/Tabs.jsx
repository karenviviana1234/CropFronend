import React from 'react';
import Tabs from '../atomos/Tabs';

function TabsGreen({ label, href }) {
    return (
        <Tabs>
            <a href={href} className='flex items-center justify-center h-full'>
                <span className='text-black hover:text-white text-lg'>{label}</span>
            </a>
        </Tabs>
    );
}

export default TabsGreen;
