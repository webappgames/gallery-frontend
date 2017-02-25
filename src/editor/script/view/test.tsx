// Put this somewhere



interface ReactStateless<T> extends React.Component<T, {}> {
    (props: T): JSX.Element;
}




export const Test: ReactStateless<{species: string}> = ({species}) => (
    <Tank>
        {species}
    </Tank>
);
