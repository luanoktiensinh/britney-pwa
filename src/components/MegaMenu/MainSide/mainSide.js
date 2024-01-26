import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import MainSideBottom from './mainSideBottom';
const mainSide = ({ data, footerLinks }) => {
    const { name, link, children: items = [] } = data;
    const limitNumberWithinRange = useCallback((num, min, max) => {
        const MIN = min ?? 1;
        const MAX = max ?? 20;
        const parsed = parseInt(num)
        return Math.min(Math.max(parsed, MIN), MAX)
    }, [])
    const separateColumns = useMemo(() => {
        const totalItems = items.reduce((acc, cur) => {
            acc += 1 + (cur.children?.length ?? 0)
            return acc;
        }, 0);
        const limitCol = Math.max(Math.ceil(totalItems / 3), 10);
        const result = [[], [], []];
        let currentCount = 0;
        let index;
        items.forEach(item => {
            currentCount += 1 + (item.children?.length ?? 0);
            index = limitNumberWithinRange(Math.ceil(currentCount / limitCol) - 1, 0, 2);
            result[index]?.push(item);
        });
        return result
    }, [items]);
    return (
        <div className='relative w-full pb-20'>
            <div className="pt-[34px] pb-[9px] border-b-2 border-solid border-[#c4c4c4] flex justify-between">
                <div className="flex items-center">
                    <h3 className='leading-5 font-bold' dangerouslySetInnerHTML={{__html: name}}></h3>
                </div>
                <a className='text-primary-500 text-sm hover_underline' href={link}>Shop all</a>
            </div>
            <div className='flex gap-4 mb-10'>
                <div className="w-8/12 flex gap-4 pt-5">
                    {
                        separateColumns.map((item, index) => (
                            <div key={index} className="flex w-1/3">
                                <ul>
                                    {
                                        item.map(child => (
                                            <li key={child.id} className='pb-2.5'>
                                                <a className="text-[#191919] font-bold text-[15px] leading-[1.5] hover_underline" dangerouslySetInnerHTML={{__html: child.name}} href={child.link}/>
                                                {
                                                    child.children?.length > 0 && (
                                                        <ul>
                                                            {
                                                                child.children.map(subChild => (
                                                                    <li key={subChild.id}>
                                                                        <a className="leading-5 text-sm text-[#707070] hover_underline" dangerouslySetInnerHTML={{__html: subChild.name}} href={subChild.link}/>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    )
                                                }
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </div>
                <div className="w-4/12" dangerouslySetInnerHTML={{__html: data.right_content ?? ''}} />
            </div>
            <MainSideBottom className='w-full' footerLinks={footerLinks}/>
        </div>
    )
}
export default mainSide;
mainSide.propTypes = {
    data: PropTypes.shape({
        children: PropTypes.array,
        id: PropTypes.number.isRequired,
        isActive: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    }).isRequired,
    footerLinks: PropTypes.array
}
mainSide.defaultProps = {
    footerLinks: []
}