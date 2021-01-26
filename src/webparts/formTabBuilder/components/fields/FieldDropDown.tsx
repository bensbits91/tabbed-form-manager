import * as React from 'react';
import { Dropdown, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';

const mcc = 'color:lime;';



export interface FieldDropDownProps {
    field: any;
    handler: any;
}

export interface FieldDropDownState {

}

class FieldDropDown extends React.Component<FieldDropDownProps, FieldDropDownState> {
    constructor(props: FieldDropDownProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        console.log('%c : FieldDropDown -> componentDidMount -> this.props', mcc, this.props);
    }

    public render() {
        const { field/* , dark, theme */ } = this.props;

        const options: IDropdownOption[] = [
            {
                key: 'noselection',
                text: 'Please make a selection',
                // disabled: true
            },
            ...field.Choices.map(c => {
                return {
                    key: c.replace(/ /g, ''),
                    text: c
                };
            })];


        return (
            <div>
                <Dropdown
                    id={field.InternalName}
                    data-go-to-section={field.go_to_section ? field.go_to_section : ''}
                    placeholder='Please make a selection'
                    label={field.Title}
                    options={options}
                    // styles={dropdownStyles_dark}
                    onChange={(e, o) => this.props.handler(/* e, o,  */field.InternalName, o.key)}
                />
            </div>
        );
    }
}

export default FieldDropDown;