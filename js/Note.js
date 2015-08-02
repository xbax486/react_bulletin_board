var Note = React.createClass({
    getInitialState: function() {
        return {editing: false}
    },
    //set the position of each note and the rotation angle randomly
    //150 is the height(width) of the note
    componentWillMount: function() {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150) + 'px',
            top: this.randomBetween(0, window.innerHeight - 150) + 'px',
            transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
        };
    },
    componentDidMount: function(){
        $(this.getDOMNode()).draggable();
    },
    //generate a random number between min and max
    randomBetween: function(min, max) {
        return (min + Math.ceil(Math.random() * max));
    },
    edit: function() {
        this.setState({editing: true});
    },
    save: function() {
        //this line corresponds to the 'update' method of Board component
        this.props.onChange(this.refs.newText.getDOMNode().value, 
            this.props.index);
        this.setState({editing: false});
    },
    remove: function() {
        //this line corresponds to the 'remove' method of Board component
        this.props.onRemove(this.props.index);
    },
    //note in display state 
    renderDisplay: function() {
        return (
            <div className="note"
                style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}
                            className="btn btn-primary glyphicon glyphicon-pencil"/>
                    <button onClick={this.remove}
                            className="btn btn-danger glyphicon glyphicon-trash"/>
                </span>
            </div>
        );
    },
    //note in editing state 
    renderForm: function() {
        return (
            <div className="note" style={this.style}>
                <textarea ref="newText" defaultValue={this.props.children} 
                    className="form-control">
                </textarea>
                <button onClick={this.save} 
                    className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
        )
    },
    //display the note in differently based on current state
    render: function() {
        if (this.state.editing) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
});