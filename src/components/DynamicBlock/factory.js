import React, { Suspense } from 'react';
import { getContentTypeConfig, setContentTypeConfig } from '@magento/pagebuilder/lib/config';
import customContentTypes from '@magento/pagebuilder/lib/ContentTypes/customContentTypes';

import { useQuery } from '@apollo/client';
import GET_DYNAMIC_BLOCK from '../../queries/DynamicBlock/dynamicBlocks.gql';

import DOMPurify from 'dompurify';
import he from 'he';

/**
 *  add custom content types
 */
const addCustomContentTypes = contentTypes => {
    for (const ContentType of contentTypes) {
        const { component, configAggregator } = ContentType;
        if (!ContentType.name) {
            ContentType.name = component.name;
        }
        if (ContentType.name && component && configAggregator) {
            setContentTypeConfig(ContentType.name, {
                component,
                configAggregator
            });
        }
    }
};

addCustomContentTypes(customContentTypes);

/**
 * Render a content type
 *
 * @param Component
 * @param data
 * @returns {*}
 */
const renderContentType = (Component, data) => {
    return (
        <Component {...data}>
            {data.children.map((childTreeItem, i) => (
                <ContentTypeFactory key={i} data={childTreeItem} />
            ))}
        </Component>
    );
};

/**
 * Create an instance of a content type component based on configuration
 *
 * @param data
 * @returns {*}
 * @constructor
 */
const ContentTypeFactory = ({ data }) => {
    const { isHidden, ...props } = data;

    if (isHidden) {
        return null;
    }

    const contentTypeConfig = getContentTypeConfig(props.contentType);
    if (props.uids) {
        const { loading, error, data: dynamicData } = useQuery(GET_DYNAMIC_BLOCK, {
            variables: {
                dynamic_block_uids: [props.uids]
            },
            fetchPolicy: 'no-cache',
        });
        if (dynamicData) {
            const dynamicHtml = dynamicData?.dynamicBlocks?.items[0]?.content?.html || "";
            const styleTags = dynamicHtml.match(/<style>([\s\S]*?)<\/style>/g);
            styleTags?.forEach((styleTag, index) => {
                const styleTagContent = styleTag?.match(/<style>([\s\S]*?)<\/style>/)[1];
                const styleElement = document.createElement("style");
                styleElement.textContent = styleTagContent;
                document.head.appendChild(styleElement);
              });
            return (
                <div 
                    className="dynamic-block__container"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(he?.decode(dynamicHtml.replace(/<style>([\s\S]*?)<\/style>/g, ''))) }}
                >
                </div>
            );
        }
    } else if (contentTypeConfig && contentTypeConfig.component) {
        const Component = renderContentType(contentTypeConfig.component, props);
        const ComponentShimmer = contentTypeConfig.componentShimmer
            ? renderContentType(contentTypeConfig.componentShimmer, props)
            : '';
        return <Suspense fallback={ComponentShimmer}>{Component}</Suspense>;
    }

    return null;
};

export default ContentTypeFactory;
