// eslint-disable-next-line import/no-unresolved
const pageAST = require('./page-ast.json'); // File created by Snooty extension on VS Code
const { getPageSlug } = require('../src/utils/get-page-slug');
const { getTemplate } = require('../src/utils/get-template');

// Returns bare minimum data needed by a single page
export const getPageData = async () => {
    const fileId = process.env.PREVIEW_PAGE;
    const pageNodes = {
        ast: pageAST,
    };
    const template = getTemplate(fileId, process.env.GATSBY_SITE);
    const slug = getPageSlug(fileId);

    return {
        path: slug,
        template,
        context: {
            slug,
            snootyStitchId: '',
            __refDocMapping: pageNodes,
            guidesMetadata: {},
        },
    };
};
