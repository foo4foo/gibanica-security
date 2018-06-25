import React from "react";

import _ from "lodash";

import Animate from "grommet/components/Animate";
import Select from "grommet/components/Select";
import TextInput from "grommet/components/TextInput";
import SaveIcon from "grommet/components/icons/base/Save";
import DownIcon from "grommet/components/icons/base/Down";
import UpIcon from "grommet/components/icons/base/Up";
import Button from "grommet/components/Button";
import DateTime from "grommet/components/DateTime";
import FormField from "grommet/components/FormField";
import NumberInput from "grommet/components/NumberInput";

import SearchBadges from "./SearchBadges";

export default class AlarmRuleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      badges: [],
      formVisible: false,
      isAdmin: false,
      rule: "",
      match: undefined,
      title: "",
      message: "",
      dateStart: undefined,
      dateEnd: undefined,
      count: undefined,
      interval: undefined
    };
  }

  componentWillMount() {
    this.setState({ isAdmin: localStorage.getItem("role") });
  }

  handleSelect = option => {
    const { badges } = this.state;

    const badge = _.find(badges, b => b.filter === option);

    if (badge) {
      this.setState({ match: option, rule: badge.search });
      return;
    }

    badges.push({ filter: option, search: "=" });

    this.setState({ match: option, badges, rule: "" });
  };

  handleRule = text => {
    const { badges, match } = this.state;

    _.forEach(badges, b => {
      if (b.filter === match) {
        if (text) {
          b.search = text;
        } else {
          b.search = "=";
        }
      }
    });

    this.setState({ badges, rule: text });
  };

  handleBadgeClick = badge => {
    this.setState({
      rule: badge.search === "=" ? "" : badge.search,
      match: badge.filter
    });
  };

  removeBadge = badge_index => {
    const badges_copy = this.state.badges;
    badges_copy.splice(badge_index, 1);
    this.setState({ badges: badges_copy });
  };

  render() {
    const {
      formVisible,
      isAdmin,
      badges,
      title,
      message,
      rule,
      match,
      dateStart,
      dateEnd,
      count,
      interval
    } = this.state;

    if (!isAdmin) {
      return null;
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <Button
              style={{
                borderColor: "#33aca8"
              }}
              fill
              label={formVisible ? "Hide Form" : "New Rule"}
              type="submit"
              icon={formVisible ? <UpIcon /> : <DownIcon />}
              onClick={() =>
                this.setState({ formVisible: !this.state.formVisible })
              }
            />
          </div>
          <div className="col-md-10" />
        </div>
        <br />
        <Animate
          visible={formVisible}
          enter={{ animation: "slide-left", duration: 500, delay: 0 }}
          leave={{ animation: "slide-right", duration: 500, delay: 0 }}
          keep={false}
        >
          <div className="row">
            <div className="col-md-9" />
            <div className="col-md-3" style={{ textAlign: "right" }}>
              <Button
                style={{
                  borderColor: "#33aca8"
                }}
                plain
                label="Save"
                type="submit"
                icon={<SaveIcon />}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-3">
              <FormField
                label="Match By"
                error={match && badges.length > 0 ? "" : "*"}
              >
                <Select
                  onChange={o => this.handleSelect(o.value)}
                  inline={false}
                  multiple={false}
                  options={["severity", "host", "process", "message"]}
                  value={match}
                />
              </FormField>
            </div>
            <div className="col-md-5">
              <FormField label="Rule goes here">
                <TextInput
                  value={rule}
                  style={{ width: "100%" }}
                  name="rule"
                  onDOMChange={e => this.handleRule(e.target.value)}
                />
              </FormField>
            </div>
            <div className="col-md-4">
              <FormField label="Message" error={message ? "" : "*"}>
                <TextInput
                  value={message}
                  onDOMChange={e => this.setState({ message: e.target.value })}
                  style={{ width: "100%" }}
                  name="message"
                  placeHolder="Your message goes here ..."
                />
              </FormField>
            </div>
          </div>
          <br />
          <div className="row" style={{ display: "flex" }}>
            <div className="col-md-3">
              <FormField label="Start Date" style={{ height: "100%" }}>
                <DateTime
                  format="D/M/YYYY H:mm:ss"
                  value={dateStart}
                  onChange={d => this.setState({ dateStart: new Date(d) })}
                />
              </FormField>
            </div>
            <div className="col-md-3">
              <FormField label="End Date" style={{ height: "100%" }}>
                <DateTime format="D/M/YYYY H:mm:ss" value={dateEnd} />
              </FormField>
            </div>
            <div className="col-md-3">
              <FormField label="Count" style={{ height: "100%" }}>
                <NumberInput
                  value={count}
                  name="count"
                  onChange={e => this.setState({ count: e.target.value })}
                />
              </FormField>
            </div>
            <div className="col-md-3">
              <FormField label="Time Interval" style={{ height: "100%" }}>
                <DateTime
                  format="H:mm:ss"
                  value={interval}
                  onChange={t => this.setState({ interval: t })}
                />
              </FormField>
            </div>
          </div>
          <Animate
            visible={badges.length > 0}
            enter={{ animation: "slide-down", duration: 500, delay: 0 }}
            leave={{ animation: "slide-up", duration: 500, delay: 0 }}
            keep
          >
            <br />
            <SearchBadges
              badges={badges}
              removeBadge={this.removeBadge}
              badgeClick={this.handleBadgeClick}
            />
          </Animate>
        </Animate>
      </div>
    );
  }
}
