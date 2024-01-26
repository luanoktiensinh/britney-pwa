import React, { useCallback, useMemo, useRef } from 'react';
import { Search } from 'react-feather';
import { Link } from 'react-router-dom';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator'
import classNames from 'classnames';
import { useBrands } from 'src/composables/MegaMenu/useBrands';
import { debounce } from 'lodash';

const MegaMenuBrandFilter = () => {
    const { data, loading, search, setSearch } = useBrands();
    const characters = useMemo(() => (
        [...'abcdefghijklmnopqrstuvwxyz']
            .map(item => ({label: item.replace(/[\[\]]/g, ''), value: item}))
    ), []);
    const inputRef = useRef();
    
    const onFilter = useCallback((e, char) => {
        e.preventDefault();
        inputRef.current.value = '';
        setSearch(char);
    });
    const onChange = (e) => {
        let _search = e.target.value || 'a';
        setSearch({ label: _search, value: _search });
    }
    return (
        <div className='relative'>
            { loading && <LoadingIndicator classes={{root: 'absolute top-0 left-1/2 -translate-x-1/2 z-50'}}/> }
            <div className={loading ? 'opacity-50 pointer-events-none' : ''}>
                <div className="relative text-[#707070]">
                    <Search className='absolute top-1/2 -translate-y-1/2 left-4 w-[22px] h-[22px] text-current'/>
                    <input type="text" 
                        className="w-full border border-solid border-[#ebebeb] text-current px-[3rem] h-[46px] text-sm"
                        placeholder='Search Brands'
                        onChange={debounce(onChange, 150)}
                        ref={inputRef}
                    />
                </div>
                <ul className="flex flex-wrap -ml-1.25 py-2.5">
                    {
                        characters.map(({value, label}) => (
                            <li 
                                key={value}
                                className={classNames(
                                    'm-1.25 3xl_w-[calc((100%/14)-10px)] w-[calc((100%/10)-10px)] border border-solid uppercase',
                                    search.value === value ? 'bg-black text-white border-black': 'bg-white text-black border-[#ececec]'
                                )}
                            >
                                <a 
                                    href='#' className='flex items-center justify-center w-full h-[55px] font-bold text-lg text-current'
                                    onClick={e => onFilter(e, {value, label})}
                                >
                                    {label}
                                </a>
                            </li>
                        ))
                    }
                </ul>
                <div className="text-lg py-3 font-bold border-b-2 border-solid border-[#e5e5e5] uppercase">
                    {search.label}
                </div>
                {
                    data?.length > 0 && (
                        <ul className="pt-2.5 mb-5">
                            {
                                data.map(item => (
                                    <li key={item.id} className='py-[3px]'>
                                        <Link to={item.urk_key} dangerouslySetInnerHTML={{__html: item.name}} className="text-[#707070] hover_underline"/>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </div>
    )
}
export default MegaMenuBrandFilter;