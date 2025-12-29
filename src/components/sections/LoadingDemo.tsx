import { useState } from 'react';
import { CTAButton } from '@/components/ui/cta-button';
import { LoadingAnimation, LoadingSpinner } from '@/components/ui/loading-animation';
import { useLoading } from '@/hooks/useLoading';

export const LoadingDemo = () => {
    const [buttonLoading, setButtonLoading] = useState(false);
    const { isLoading, withLoading } = useLoading();

    const simulateButtonAction = () => {
        setButtonLoading(true);
        setTimeout(() => {
            setButtonLoading(false);
        }, 3000);
    };

    const simulateAsyncAction = () => {
        withLoading(async () => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2500));
        });
    };

    return (
        <div className='hidden'>
            {/* This component is hidden but demonstrates the loading animation usage */}
            <div className='space-y-8 p-8'>
                <h3 className='text-2xl font-bold text-center'>Loading Animations Demo</h3>

                {/* Different sizes */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    <div className='text-center'>
                        <h4 className='font-semibold mb-4'>Small</h4>
                        <LoadingAnimation size='sm' />
                    </div>
                    <div className='text-center'>
                        <h4 className='font-semibold mb-4'>Medium</h4>
                        <LoadingAnimation size='md' />
                    </div>
                    <div className='text-center'>
                        <h4 className='font-semibold mb-4'>Large</h4>
                        <LoadingAnimation size='lg' />
                    </div>
                </div>

                {/* Spinner variants */}
                <div className='text-center space-y-4'>
                    <h4 className='font-semibold'>Inline Spinners</h4>
                    <div className='flex justify-center items-center gap-4'>
                        <LoadingSpinner size='sm' />
                        <LoadingSpinner size='md' />
                        <LoadingSpinner size='lg' />
                    </div>
                </div>

                {/* Interactive buttons */}
                <div className='text-center space-y-4'>
                    <h4 className='font-semibold'>Interactive Examples</h4>
                    <div className='flex justify-center gap-4'>
                        <CTAButton
                            onClick={simulateButtonAction}
                            isLoading={buttonLoading}
                        >
                            Button with Loading
                        </CTAButton>
                        <CTAButton
                            onClick={simulateAsyncAction}
                            variant='secondary'
                            isLoading={isLoading}
                        >
                            Async Action
                        </CTAButton>
                    </div>
                </div>
            </div>
        </div>
    );
};
