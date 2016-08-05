var ExRulesEditor = React.createClass({
    Store: (new ExRulesEditorStoreFactory()).GetStoreInstance(),

    fetchRules: function () {
        window.RulesEditorActions.fetchRules();
    },

    fetchNewRule: function () {
        window.RulesEditorActions.fetchNewRule();
    },

    getInitialState: function () {
        return {
            Rules: [],
            CurrentRule: []
        }
    },

    componentDidMount: function () {
        this.Store.addChangeRuleListener(this._onChangeRule);
        this.Store.addNewRuleListener(this._onNewRule);
        this.fetchRules();
        this.fetchNewRule();
    },

    componentWillUnmount: function () {
        this.Store.removeChangeRuleListener(this._onChangeRule);
        this.Store.removeNewRuleListener(this._onNewRule);
    },

    _onChangeRule: function (prules) {
        this.setState({ Rules: prules });
    },

    _onNewRule: function (prule) {
        this.setState({ CurrentRule: prule });
    },

    onEditCurrentRule: function(prule) {
        this.setState({ CurrentRule: prule });
    },

    render: function () {
        return (
            <div>
                <ExRulesEditorView Rules={this.state.Rules} />
                <ExRulesEditorForm CurrentRule={this.state.CurrentRule} onChange={this.onEditCurrentRule} />
            </div>
      );
    }
});

ReactDOM.render(
  <ExRulesEditor />,
  document.getElementById('exruleseditor')
);

