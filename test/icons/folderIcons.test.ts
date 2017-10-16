import * as assert from 'assert';
import { IconConfiguration, IconJsonOptions, IconPack, FolderTheme } from '../../src/models/index';
import { getFolderIconDefinitions, getDefaultIconOptions } from '../../src/icons/index';
import * as merge from 'lodash.merge';

suite('folder icons', () => {
    const folderIcons: FolderTheme[] = [
        {
            name: 'specific',
            defaultIcon: { name: 'folder' },
            rootFolder: { name: 'folder' },
            icons: [
                { name: 'folder-src', folderNames: ['src', 'source'] },
                { name: 'folder-angular', folderNames: ['angular', 'ng'], pack: IconPack.Angular }
            ]
        },
        {
            name: 'blue',
            defaultIcon: { name: 'folder-blue' },
            icons: [
                { name: 'folder-blue-src', folderNames: ['src', 'source'] }
            ]
        },
        { name: 'classic', defaultIcon: { name: 'folder' } },
        { name: 'none', defaultIcon: { name: '' } },
    ];
    const iconConfig = new IconConfiguration();

    test('should configure icon definitions', () => {
        const options = getDefaultIconOptions();
        const def = getFolderIconDefinitions(folderIcons, iconConfig, options);
        const value = new IconConfiguration();
        value.iconDefinitions = {
            'folder': {
                'iconPath': './../../icons/folder.svg'
            },
            'folder-open': {
                'iconPath': './../../icons/folder-open.svg'
            },
            'folder-src': {
                'iconPath': './../../icons/folder-src.svg'
            },
            'folder-src-open': {
                'iconPath': './../../icons/folder-src-open.svg'
            },
            'folder-angular': {
                'iconPath': './../../icons/folder-angular.svg'
            },
            'folder-angular-open': {
                'iconPath': './../../icons/folder-angular-open.svg'
            }
        };
        value.folder = 'folder';
        value.folderExpanded = 'folder-open';
        value.rootFolder = 'folder';
        value.rootFolderExpanded = 'folder-open';
        value.folderNames = {
            'src': 'folder-src',
            'source': 'folder-src',
            'angular': 'folder-angular',
            'ng': 'folder-angular'
        };
        value.folderNamesExpanded = {
            'src': 'folder-src-open',
            'source': 'folder-src-open',
            'angular': 'folder-angular-open',
            'ng': 'folder-angular-open'
        };

        assert.deepEqual(def, value);
    });

    test('should deactivate folder icons', () => {
        const options = getDefaultIconOptions();
        options.folderTheme = 'none';
        const def = getFolderIconDefinitions(folderIcons, iconConfig, options);
        const value = new IconConfiguration();

        value.iconDefinitions = {};
        value.folderNames = {};
        value.folderNamesExpanded = {};

        assert.deepEqual(def, value);
    });

    test('should enable folder theme', () => {
        const options = getDefaultIconOptions();
        options.folderTheme = 'blue';
        const def = getFolderIconDefinitions(folderIcons, iconConfig, options);
        const value = new IconConfiguration();

        value.iconDefinitions = {
            'folder-blue': {
                'iconPath': './../../icons/folder-blue.svg'
            },
            'folder-blue-open': {
                'iconPath': './../../icons/folder-blue-open.svg'
            },
            'folder-blue-src': {
                'iconPath': './../../icons/folder-blue-src.svg'
            },
            'folder-blue-src-open': {
                'iconPath': './../../icons/folder-blue-src-open.svg'
            }
        };
        value.folder = 'folder-blue';
        value.folderExpanded = 'folder-blue-open';
        value.rootFolder = 'folder-blue';
        value.rootFolderExpanded = 'folder-blue-open';

        value.folderNames = {
            'src': 'folder-blue-src',
            'source': 'folder-blue-src'
        };
        value.folderNamesExpanded = {
            'src': 'folder-blue-src-open',
            'source': 'folder-blue-src-open'
        };

        assert.deepEqual(def, value);
    });

    test('should disable icon packs', () => {
        const options = getDefaultIconOptions();
        options.activatedPacks = [];
        const def = getFolderIconDefinitions(folderIcons, iconConfig, options);
        const value = new IconConfiguration();
        value.iconDefinitions = {
            'folder': {
                'iconPath': './../../icons/folder.svg'
            },
            'folder-open': {
                'iconPath': './../../icons/folder-open.svg'
            },
            'folder-src': {
                'iconPath': './../../icons/folder-src.svg'
            },
            'folder-src-open': {
                'iconPath': './../../icons/folder-src-open.svg'
            }
        };
        value.folder = 'folder';
        value.folderExpanded = 'folder-open';
        value.rootFolder = 'folder';
        value.rootFolderExpanded = 'folder-open';
        value.folderNames = {
            'src': 'folder-src',
            'source': 'folder-src'
        };
        value.folderNamesExpanded = {
            'src': 'folder-src-open',
            'source': 'folder-src-open'
        };

        assert.deepEqual(def, value);
    });

    test('should configure folder icons for light and high contrast', () => {
        const options = getDefaultIconOptions();
        const def = getFolderIconDefinitions(folderIcons, iconConfig, options);
        const value = new IconConfiguration();
        const lightHighContrastFolderIcons: FolderTheme[] = [
            {
                name: 'specific',
                defaultIcon: { name: 'folder', light: true, highContrast: true },
                rootFolder: { name: 'folder-root', light: true, highContrast: true },
                icons: [
                    { name: 'folder-src', folderNames: ['src', 'source'], light: true, highContrast: true },
                    { name: 'folder-test', folderNames: ['test'], light: true, highContrast: true }
                ]
            }
        ];

        value.iconDefinitions = {
            'folder': {
                'iconPath': './../../icons/folder.svg'
            },
            'folder-open': {
                'iconPath': './../../icons/folder-open.svg'
            },
            'folder_light': {
                'iconPath': './../../icons/folder_light.svg'
            },
            'folder-open_light': {
                'iconPath': './../../icons/folder-open_light.svg'
            },
            'folder_highContrast': {
                'iconPath': './../../icons/folder_highContrast.svg'
            },
            'folder-open_highContrast': {
                'iconPath': './../../icons/folder-open_highContrast.svg'
            },
            'folder-root': {
                'iconPath': './../../icons/folder-root.svg'
            },
            'folder-root-open': {
                'iconPath': './../../icons/folder-root-open.svg'
            },
            'folder-root_light': {
                'iconPath': './../../icons/folder-root_light.svg'
            },
            'folder-root-open_light': {
                'iconPath': './../../icons/folder-root-open_light.svg'
            },
            'folder-root_highContrast': {
                'iconPath': './../../icons/folder-root_highContrast.svg'
            },
            'folder-root-open_highContrast': {
                'iconPath': './../../icons/folder-root-open_highContrast.svg'
            },
            'folder-src': {
                'iconPath': './../../icons/folder-src.svg'
            },
            'folder-src-open': {
                'iconPath': './../../icons/folder-src-open.svg'
            },
            'folder-src_light': {
                'iconPath': './../../icons/folder-src_light.svg'
            },
            'folder-src-open_light': {
                'iconPath': './../../icons/folder-src-open_light.svg'
            },
            'folder-test': {
                'iconPath': './../../icons/folder-test.svg'
            },
            'folder-test-open': {
                'iconPath': './../../icons/folder-test-open.svg'
            },
            'folder-test_light': {
                'iconPath': './../../icons/folder-test_light.svg'
            },
            'folder-test-open_light': {
                'iconPath': './../../icons/folder-test-open_light.svg'
            }
        };
        value.folder = 'folder';
        value.folderExpanded = 'folder-open';
        value.rootFolder = 'folder-root';
        value.rootFolderExpanded = 'folder-root-open';
        value.folderNames = {
            'src': 'folder-src',
            'source': 'folder-src',
            'test': 'folder-test'
        };
        value.folderNamesExpanded = {
            'src': 'folder-src-open',
            'source': 'folder-src-open',
            'test': 'folder-test-open'
        };
        value.light = {
            folder: 'folder_light',
            folderExpanded: 'folder-open_light',
            rootFolder: 'folder-root_light',
            rootFolderExpanded: 'folder-root-open_light',
            folderNames: {
                'src': 'folder-src_light',
                'source': 'folder-src_light',
                'test': 'folder-test_light'
            },
            folderNamesExpanded: {
                'src': 'folder-src-open_light',
                'source': 'folder-src-open_light',
                'test': 'folder-test-open_light'
            }
        };
        value.highContrast = {
            folder: 'folder_highContrast',
            folderExpanded: 'folder-open_highContrast',
            rootFolder: 'folder-root_highContrast',
            rootFolderExpanded: 'folder-root-open_highContrast',
            folderNames: {
                'src': 'folder-src_highContrast',
                'source': 'folder-src_highContrast',
                'test': 'folder-test_highContrast'
            },
            folderNamesExpanded: {
                'src': 'folder-src-open_highContrast',
                'source': 'folder-src-open_highContrast',
                'test': 'folder-test-open_highContrast'
            }
        };
    });
});
