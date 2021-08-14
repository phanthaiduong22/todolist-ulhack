import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AnimatedProgressProvider from "../../components/AnimatedProgressProvider/AnimatedProgressProvider";
import { easeQuadInOut } from "d3-ease";
import callAPI from "../../utils/apiCaller";
import { Redirect } from "react-router-dom";

let productivity = 0.1;
let clicked = 0;
class Reward extends Component {
  constructor(props) {
    super(props);
    this.state = { productivity: 0.1 };
  }

  componentDidMount = () => {
    const username = window.localStorage.getItem("username");
    if (username === null) {
      this.setState({ redirect: "/login" });
    } else {
      callAPI(`/tasks/${username}/productivity`, "GET", {})
        .then((response) => {
          this.setState({ productivity: response.data.productivity });
          productivity = this.state.productivity;
          if (clicked === 0) {
            this.createTree();
          } else clicked = 1;
        })
        .catch((e) => {
          return;
        });
    }
  };

  createTree = () => {
    // Constructor
    var TreeView = function ($element) {
      this.isEnabled = false;

      this.element = $element;

      this.ctx = this.element.getContext("2d");

      this.element.height = 600;

      this.element.width = window.innerWidth / 1.5;

      this.baseWidth = 20;

      this.landHeight = 40;

      this.branches = [
        {
          xPos: (this.element.width - this.baseWidth) / 2,
          yPos: this.element.height - this.landHeight / 2,
          startTime: null,
        },
      ];

      this.branchCount = 1;

      this.currentStrokeWidth = this.baseWidth;

      // Lower rateOfGrowth allows for a higher branchLength
      // lower rateOfGrowth means the branchSpread should
      // be lower as well to keep it from getting too wide
      this.branchLength = 100 + productivity * 250;

      this.rateOfGrowth = 1;

      this.branchSpread = 1;

      this.animationRequests = [];

      this.init();
    };

    // Alias prototype
    var proto = TreeView.prototype;

    // Top level function
    proto.init = function () {
      return this.drawScape().drawTree().enable();
    };

    proto.enable = function () {
      if (this.isEnabled) {
        return this;
      }

      this.isEnabled = true;

      return this;
    };

    proto.drawTree = function () {
      this.ctx.strokeStyle = "#825201";
      this.ctx.beginPath();
      var request = window.requestAnimationFrame(
        this.taperedTrunk.bind(this, 0)
      );
      this.animationRequests.push(request);

      return this;
    };

    proto.taperedTrunk = function (branchIndex, timestamp) {
      if (!this.branches[branchIndex].startTime)
        this.branches[branchIndex].startTime = timestamp;
      var elapsedTime = timestamp - this.branches[branchIndex].startTime;

      var endTime = this.baseWidth * this.branchLength;

      this.ctx.lineWidth =
        this.currentStrokeWidth - (elapsedTime / endTime) * 8;
      this.ctx.moveTo(
        this.branches[branchIndex].xPos,
        this.branches[branchIndex].yPos
      );

      this.branches[branchIndex].yPos -= Math.random() * this.rateOfGrowth;

      if (branchIndex === 0 && this.branchCount === 1) {
        var newX = Math.random() * 0.5;
        newX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        this.branches[branchIndex].xPos += newX;
      } else if (branchIndex < this.branchCount / 2) {
        this.branches[branchIndex].xPos -= Math.random() * this.branchSpread;
      } else if (branchIndex >= this.branchCount / 2) {
        this.branches[branchIndex].xPos += Math.random() * this.branchSpread;
      }

      this.ctx.lineTo(
        this.branches[branchIndex].xPos,
        this.branches[branchIndex].yPos
      );

      this.ctx.stroke();
      if (this.currentStrokeWidth < 0.2 || this.branchCount >= 64) {
        this.cancelAllAnimationRequests();
      } else if (elapsedTime >= endTime * (5 / 8)) {
        this.splitBranch();
      } else if (elapsedTime < endTime * (5 / 8)) {
        var request = window.requestAnimationFrame(
          this.taperedTrunk.bind(this, branchIndex)
        );
        this.animationRequests.push(request);
      }

      return this;
    };

    proto.splitBranch = function () {
      this.cancelAllAnimationRequests();

      for (var i = 0; i < this.branchCount; i++) {
        this.branches[i].startTime = null;

        var newBranch = {
          xPos: this.branches[i].xPos,
          yPos: this.branches[i].yPos,
          startTime: null,
        };
        this.branches.push(newBranch);
      }

      this.branchCount = this.branches.length;
      this.currentStrokeWidth *= 2 / 3;
      this.branchLength *= 2 / 3;

      for (var i = 0; i < this.branchCount; i++) {
        var request = window.requestAnimationFrame(
          this.taperedTrunk.bind(this, i)
        );
        this.animationRequests.push(request);
      }

      return this;
    };

    proto.cancelAllAnimationRequests = function () {
      for (var i = 0; i < this.animationRequests.length; i++) {
        window.cancelAnimationFrame(this.animationRequests[i]);
      }
      this.animationRequests = [];

      return this;
    };

    proto.drawScape = function () {
      // Sky
      this.ctx.fillStyle = "rgba(0,206,250,1)"; // animate the opacity of this color for transition between day and night
      this.ctx.fillRect(
        0,
        0,
        this.element.width,
        this.element.height - this.landHeight
      );

      // Land
      this.ctx.fillStyle = "#FF941c";
      this.ctx.fillRect(
        0,
        this.element.height - this.landHeight,
        this.element.width,
        this.element.height
      );

      // Sun
      this.ctx.fillStyle = "#FF0";
      this.ctx.strokewidth = 0;
      this.ctx.beginPath();
      this.ctx.arc(this.element.width - 75, 75, 50, 0, Math.PI * 2, false);
      this.ctx.fill();

      // Clouds
      this.drawCloud(25, 50);
      this.drawCloud(this.element.width / 2, 80);
      this.drawCloud(this.element.width - 70, 50);

      // Hills
      this.drawHills();

      return this;
    };

    proto.drawHills = function () {
      var hillWidth = 70;
      var hillWidthHalf = hillWidth / 2;
      var xPos = 20;
      var skyHeight = this.element.height - this.landHeight;
      var yPos = skyHeight;

      // relative heights are the difference between a given hill
      // and its previous
      var small, med, large;
      small = 0.15;
      med = 0.25;
      large = 0.7;

      var hillHeights = [
        {
          full: skyHeight * med,
          relative: -skyHeight * med,
        },
        {
          full: skyHeight * med + hillWidthHalf,
          relative: 0,
        },
        {
          full: skyHeight * large,
          relative: -(skyHeight * large - (skyHeight * med + hillWidth)),
        },
        {
          full: skyHeight * large - hillWidthHalf,
          relative:
            skyHeight * large -
            hillWidthHalf -
            (skyHeight * small + hillWidthHalf),
        },
        {
          full: skyHeight * small,
          relative: skyHeight * small,
        },
      ];

      var midway = Math.floor(hillHeights.length / 2);

      this.ctx.fillStyle = "#069611";
      this.ctx.strokewidth = 2;
      this.ctx.strokeStyle = "#000";
      this.ctx.beginPath();

      for (var i = 0, j = hillHeights.length; i < j; i++) {
        this.ctx.moveTo(xPos, yPos);
        if (i <= midway) {
          // First half
          yPos += hillHeights[i].relative;
          this.ctx.lineTo(xPos, yPos);
          this.ctx.arc(
            xPos + hillWidthHalf,
            yPos,
            hillWidthHalf,
            Math.PI,
            0,
            false
          );
          this.ctx.fillRect(xPos, yPos, hillWidth, hillHeights[i].full);
        } else {
          // second half
          this.ctx.arc(
            xPos + hillWidthHalf,
            yPos,
            hillWidthHalf,
            Math.PI,
            0,
            false
          );
          this.ctx.fillRect(xPos, yPos, hillWidth, hillHeights[i].full);
        }

        this.ctx.moveTo(xPos + hillWidthHalf - 5, yPos - hillWidthHalf / 2 - 4);
        this.ctx.lineTo(xPos + hillWidthHalf - 5, yPos - hillWidthHalf / 2 + 4);
        this.ctx.moveTo(xPos + hillWidthHalf + 5, yPos - hillWidthHalf / 2 - 4);
        this.ctx.lineTo(xPos + hillWidthHalf + 5, yPos - hillWidthHalf / 2 + 4);

        xPos += hillWidthHalf;

        if (i < midway) {
          yPos -= hillWidthHalf;
        } else if (i === midway) {
          yPos += hillWidthHalf;
        } else {
          xPos += hillWidthHalf;
          this.ctx.moveTo(xPos, yPos);
          yPos += hillHeights[i].relative;
          this.ctx.lineTo(xPos, yPos);
          xPos -= hillWidthHalf;
          yPos += hillWidthHalf;
        }
      }

      this.ctx.fill();
      this.ctx.stroke();

      return this;
    };

    proto.drawCloud = function (xPos, yPos) {
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.9";
      this.ctx.strokewidth = 0;
      this.ctx.beginPath();

      for (var i = 0; i < 5; i++) {
        var altY = i % 2 === 0 ? yPos : yPos - 15;
        this.ctx.arc(xPos, altY, 20, 0, Math.PI * 2, false);
        xPos += 15;
      }

      this.ctx.fill();

      return this;
    };

    return new TreeView(document.getElementById("tree"));
  };

  render() {
    let { redirect } = this.state;
    if (redirect) {
      this.setState({ redirect: "" });
      return <Redirect to={redirect} replace />;
    }
    const percentage = this.state.productivity * 100;
    return (
      <>
        <Container>
          <div style={{ width: 100, height: 100 }}>
            <AnimatedProgressProvider
              valueStart={0}
              valueEnd={percentage}
              duration={1.4}
              easingFunction={easeQuadInOut}
            >
              {(value) => {
                const roundedValue = Math.round(value);
                return (
                  <CircularProgressbar
                    value={value}
                    text={`${roundedValue}%`}
                    styles={buildStyles({ pathTransition: "none" })}
                  />
                );
              }}
            </AnimatedProgressProvider>
          </div>
          <div className="main">
            <canvas id="tree"></canvas>
          </div>
        </Container>
      </>
    );
  }
}
export default Reward;
