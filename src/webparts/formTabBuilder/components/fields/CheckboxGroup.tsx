import * as React from 'react';
import { Checkbox, ICheckboxProps } from 'office-ui-fabric-react/lib/Checkbox';





export interface CheckboxGroupsProps {
    field: any;
    handler: any;
}

export interface CheckboxGroupsState {

}

class CheckboxGroups extends React.Component<CheckboxGroupsProps, CheckboxGroupsState> {
    constructor(props: CheckboxGroupsProps) {
        super(props);
        this.state = {};
        // this.props.handler.bind(this);
    }

    public render() {
        const { field } = this.props;

        const field_label = field.TypeAsString == 'MultiChoice' ? field.Title : '';
        const field_choices = field.TypeAsString == 'MultiChoice' ? field.Choices : [field.Title];

        const choices = field_choices.map(c => {
            return <Checkbox
                key={makeKey(c)}
                label={c}
                onChange={(event, checked) => this.props.handler(/* event,  */field.InternalName, c, checked)}
            />;
        });

        return (
            <div>
                {field_label}
                {choices}
            </div>
        );
    }
}

function makeKey(string) {
    return string.replace(/ /g, '');
}


export default CheckboxGroups;