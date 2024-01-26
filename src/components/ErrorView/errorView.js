import React, { useCallback, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import Button from '@magento/venia-ui/lib/components/Button';
import notFoundImage from 'src/images/404.png';
import { createPortal } from 'react-dom';

const DEFAULT_HEADER = "TABLE'S SET, BUT THIS PAGE IS STILL COOKING....";
const DEFAULT_MESSAGE = "The page you're looking for doesn't exist or has been removed. Return to our homepage more for tasteful homeware delights.";
const DEFAULT_PROMPT = 'Back to Home.';

const ErrorView = () => {
    const history = useHistory();

    const handleGoHome = useCallback(() => {
        history.push('/');
    }, [history]);

    const header = (
        <FormattedMessage
            id={'errorView.header'}
            defaultMessage={DEFAULT_HEADER}
        />
    )
    const message = (
        <FormattedMessage
            id={'errorView.message'}
            defaultMessage={DEFAULT_MESSAGE}
        />
    )
    const buttonPrompt = (
        <FormattedMessage
            id={'errorView.goHome'}
            defaultMessage={DEFAULT_PROMPT}
        />
    )
    const onClick = handleGoHome;

    const handleClick = useCallback(() => {
        onClick && onClick();
    }, [onClick]);

    useEffect(() => {
        const classNotFound = 'not-found-page';
        document.body.classList.add(classNotFound);
        return () => {
            document.body.classList.remove(classNotFound);
        }
    });
    return createPortal(
        <div className="px-[30px] max-w-[1200px] text-center mx-auto mt-[100px] lg_mt-[50px]" data-cy="ErrorView-root">
            <img src={notFoundImage} alt="not found" className='max-w-full w-[1000px]'/>
            <h3 className="lg_text-[53px] text-[28px] font-bold mb-2.5 lg_mb-5 uppercase text-[#092667]">{header}</h3>
            <p className="mb-2.5 max-w-[1000px] mx-auto lg_text-[32px] text-black" data-cy="ErrorView-message">
                {message}
            </p>
            <Button className="p-5 lg_mt-2.5 min-w-[246px] bg-[#092667] text-white text-lg" priority="high" type="button" onClick={handleClick}>
                {buttonPrompt}
            </Button>
        </div>, document.body
    );
};

export default ErrorView;
