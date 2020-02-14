import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import Link from './link';
import { colorMap, fontSize, lineHeight, screenSize, size } from './theme';

const MINIMUM_EXPANDABLE_SIZE = 3;

const TagLink = styled(Link)`
    background-color: ${colorMap.greyDarkThree};
    border: 1px solid ${colorMap.greyDarkThree};
    border-radius: ${size.medium};
    color: ${colorMap.greyLightTwo};
    display: inline-block;
    font-size: ${fontSize.micro};
    line-height: ${lineHeight.micro};
    margin-right: ${size.tiny};
    padding: 0 ${size.small};
    text-decoration: none;
    text-transform: uppercase;
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.micro};
    }
    &:active,
    &:focus,
    &:hover {
        border: 1px solid ${colorMap.lightGreen};
        cursor: pointer;
        transition: border 0.15s;
    }
    &:visited {
        color: ${colorMap.greyLightTwo};
    }
`;

const TagList = styled('ul')`
    padding-left: 0;
`;

const TagListItem = styled('li')`
    display: inline-block;
`;

const BlogTag = ({ children, ...props }) => (
    <TagListItem>
        <TagLink {...props}>{children}</TagLink>
    </TagListItem>
);

// eslint-disable-next-line no-unused-vars
const BlogTagList = ({ tags, tagLinkBase }) => {
    // TODO: add in article link below once finalized
    // const getArticleLink = tagName => `${tagLinkBase}/${tagName}`
    const canExpand = tags.length >= MINIMUM_EXPANDABLE_SIZE;
    // By default any list of blog tags under the minimum expandable size is already expanded
    const [isExpanded, setIsExpanded] = useState(!canExpand);
    const expandList = useCallback(() => setIsExpanded(true), []);
    return (
        <TagList>
            {isExpanded &&
                tags.map(t => (
                    <BlogTag key={t.text} to={t.to}>
                        {t.text}
                    </BlogTag>
                ))}
            {!isExpanded && canExpand && (
                <>
                    {/* Since this can expand, we know value[0] and value[1] exist */}
                    <BlogTag to={tags[0].to}>{tags[0].text}</BlogTag>
                    <BlogTag to={tags[1].to}>{tags[1].text}</BlogTag>
                    <BlogTag onClick={expandList}>...</BlogTag>
                </>
            )}
        </TagList>
    );
};

export default BlogTagList;