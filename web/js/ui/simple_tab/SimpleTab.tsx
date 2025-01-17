import * as React from 'react';
import doc = Mocha.reporters.doc;

export class SimpleTab extends React.Component<IProps, IState> {

    constructor(props: IProps, context: any) {
        super(props, context);

        this.toggleHover = this.toggleHover.bind(this);

        this.state = {
            hover: false
        };

    }

    public render() {

        const isActive = () => {

            const {href} = this.props;

            if (href === "#" && document.location.hash === "") {
                return true;
            }

            if (href.startsWith("#")) {
                return document.location.hash === href;
            }

            return document.location.href === href;

        };

        const active = isActive();

        const computeBorderColor = () => {

            if (active) {
                return 'var(--primary600)';
            }

            if (this.state.hover) {
                return 'var(--grey400)';
            }

            return 'transparent';

        };

        const borderColor = computeBorderColor();

        const borderBottom = `3px solid ${borderColor}`;

        const color = active ? 'var(--grey900)' : 'var(--grey700)';

        return (

            <div>

                <a href={this.props.href}
                   className="p-2 ml-1 mr-1"
                   onMouseEnter={() => this.toggleHover()}
                   onMouseLeave={() => this.toggleHover()}
                   style={{
                       color,
                       textDecoration: 'none',
                       borderBottom
                   }}>

                    {this.props.text}

                </a>

            </div>

        );
    }

    private toggleHover() {
        this.setState({...this.state, hover: ! this.state.hover});
    }

}

export interface IProps {
    readonly href: string;
    readonly text: string;
}

export interface IState {
    readonly hover: boolean;

}
