import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';


export const

    colors = {
        navy: '#1e3b5a',
        mint: '#34bebd',
        green: '#34be78',
        yellow: '#ffc658',
        orange: '#ff7300',
        red: '#be3435',
        pink: '#be347a',
        gray: {
            e: '#eee',
            d: '#ddd',
            c: '#ccc',
            b: '#bbb',
            a: '#aaa',
        },
        black: {
            b9: '#999',
            b8: '#888',
            b7: '#777',
            b5: '#555',
            b4: '#444',
            b3: '#333',
            b2: '#222'
        }
    },

    tabs = [
        {
            title: 'Start',
            id: 0,
            show: true,
            sections: [
                {
                    title: '',
                    fields: [
                        {
                            InternalName: 'EmployeeName',
                            show: true
                        },
                        {
                            InternalName: 'EmployeeNameNoProfile',
                            show: false
                        },
                        {
                            InternalName: 'NoProfileYet',
                            show: true
                        },
                        {
                            InternalName: 'EmployeeType',
                            show: true
                        },
                    ]
                },
                {
                    title: '',
                    columns: 2,
                    fields: [
                        {
                            InternalName: 'Checklist',
                            show: true
                        },
                        {
                            InternalName: 'ChecklistHourly',
                            show: false
                        },
                        {
                            InternalName: 'ChecklistSalary',
                            show: false
                        },
                        {
                            InternalName: 'ChecklistCorporate',
                            show: false
                        },
                    ]
                },
            ]
        },
        {
            title: 'Update Personal Information',
            id: 1,
            sections: [
                {
                    title: '',
                    columns: 2,
                    fields: [
                        {
                            InternalName: 'EmployeeId',
                            show: true
                        },
                        {
                            InternalName: 'FirstName',
                            show: true
                        },
                        {
                            InternalName: 'LastName',
                            show: true
                        },
                        {
                            InternalName: 'Nickname',
                            show: true
                        },
                        {
                            InternalName: 'Email',
                            show: true
                        },
                        {
                            InternalName: 'WorkPhone',
                            show: true
                        },
                        {
                            InternalName: 'CellPhone',
                            show: true
                        },
                    ]
                }
            ]
        },
        {
            title: 'Update Position Details',
            id: 2,
            sections: [
                {
                    title: '',
                    fields: [
                        {
                            InternalName: 'Location',
                            show: true
                        },
                        {
                            InternalName: 'HireDate',
                            show: true
                        },
                        {
                            InternalName: 'Manager',
                            show: true
                        },
                        {
                            InternalName: 'Rate',
                            show: true
                        },
                        {
                            InternalName: 'JobTitle',
                            show: true
                        },
                    ]
                },
            ]
        },
        {
            title: 'New Hire Onboarding Worksheet',
            id: 3,
        },
        {
            title: 'Manual Check Request',
            id: 4,
        },
        {
            title: 'PTO Request',
            id: 5,
        },
        {
            title: 'LOA Request',
            id: 6,
        },
        {
            title: 'Incident Report',
            id: 7,
        },
        {
            title: 'Termination',
            id: 8,
        },
    ],




    def_top_menu_items: ICommandBarItemProps[] = [
        {
            key: 'save',
            text: 'Save All',
            iconProps: { iconName: 'SaveAll' },
        },
        {
            key: 'review',
            text: 'Request Review',
            iconProps: { iconName: 'Feedback' },
        },
        {
            key: 'attach',
            text: 'Attach Files',
            iconProps: { iconName: 'Attach' },
        },
        {
            key: 'share',
            text: 'Share',
            iconProps: { iconName: 'Share' },
            onClick: () => console.log('Share')
        },
        {
            key: 'export',
            text: 'Export',
            iconProps: { iconName: 'Download' },
            onClick: () => console.log('Download')
        },
        {
            key: 'cancel',
            text: 'Cancel',
            iconProps: { iconName: 'Cancel' },
        },
    ],

    def_top_menu_overflowItems: ICommandBarItemProps[] = [
        { key: 'move', text: 'Move to...', onClick: () => console.log('Move to'), iconProps: { iconName: 'MoveToFolder' } },
        { key: 'copy', text: 'Copy to...', onClick: () => console.log('Copy to'), iconProps: { iconName: 'Copy' } },
        { key: 'rename', text: 'Rename...', onClick: () => console.log('Rename'), iconProps: { iconName: 'Edit' } }
    ],

    def_top_menu_farItems: ICommandBarItemProps[] = [
        {
            key: 'size',
            button_id: 'size',
            text: 'Toggle compact mode',
            ariaLabel: 'Toggle compact mode', // This needs an ariaLabel since it's icon-only
            iconOnly: true,
            iconProps: { iconName: 'SizeLegacy' },
        },
        {
            key: 'mode',
            button_id: 'mode',
            text: 'Toggle dark mode',
            ariaLabel: 'Toggle dark mode',
            iconOnly: true,
            iconProps: { iconName: 'ClearNight' },
        },
        {
            key: 'layout',
            button_id: 'layout',
            text: 'Change layout',
            ariaLabel: 'Change layout',
            iconOnly: true,
            iconProps: { iconName: 'Tiles' },
        },
        {
            key: 'info',
            button_id: 'info',
            text: 'Info',
            ariaLabel: 'Info',
            iconOnly: true,
            iconProps: { iconName: 'Info' },
        }
    ],

    def_form_buttons_items: ICommandBarItemProps[] = [
        {
            key: 'prev',
            button_id: 'prev',
            text: 'Previous Form',
            iconProps: { iconName: 'Back' }, 
        },
    ],

    def_form_buttons_farItems: ICommandBarItemProps[] = [
        {
            key: 'next',
            button_id: 'next',
            text: 'Next Form',
            iconProps: { iconName: 'Forward' },// move icon to right
        },
    ]


    ;


