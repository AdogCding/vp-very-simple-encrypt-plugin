
import {path} from '@vuepress/utils'

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
function isDirectoryStr(pathStr) {
    try {
        return pathStr.endsWith("/");
    } catch (err) {
        console.error(err);
    }
    return false;
}
function areFilesInSameDir(pathBob, pathTom) {
    return path.dirname(pathBob) === path.dirname(pathTom)
}
function isInDir(pathStr, dirPathStr) {
    const relativePath = path.relative(dirPathStr, pathStr);
    return !relativePath.startsWith("..") && !path.isAbsolute(relativePath);
}
// try to find a encrypting config
function matchPathAgainstEncryptConfig(pagePath, configs) {
    for (let config of configs) {
        let pagePathOfConfig = config["file"]
        const protectDirectoryIfIndex = config["protectDirectoryIfIndex"]
        if (pagePathOfConfig === pagePath) {
            return config
        }
        if (isDirectoryStr(pagePathOfConfig) && isInDir(pagePath,pagePathOfConfig)) {
            return config
        }
        // don't do recursively
        if (protectDirectoryIfIndex && pagePathOfConfig.endsWith("README.md") && areFilesInSameDir(pagePath, pagePathOfConfig)) {
            return config
        }
    }
    return null
}


export default (options = {}) => ({
    name: 'vp-very-simple-encrypt-plugin',

    clientConfigFile: path.resolve(__dirname, "client.js") ,

    extendsPage(page) {

    },


    extendsMarkdown: (md) => {
        md.core.ruler.push('add_password_protection', (state) => {
            const {filePathRelative, base} = state.env
            const {encryptPaths} = options;
            if (!encryptPaths) {
                return;
            }
            const configOfPage = matchPathAgainstEncryptConfig(`${base}${filePathRelative}`, encryptPaths);
            if (configOfPage == null) {
                return;
            }
            const {password} = configOfPage;
            const openToken = new state.Token('html_block', '', 0);
            openToken.content = `<div class="markdown-root"><PasswordProtected password="${password}">`;
            const closeToken = new state.Token('html_block', '', 0);
            closeToken.content = '</PasswordProtected></div>';
            state.tokens.unshift(openToken); // 在文档开头插入
            state.tokens.push(closeToken);   // 在文档结尾插入
        });
    },
    define: {
        ENCRYPT_CONFIG: options.encrypt || {},
    },
});