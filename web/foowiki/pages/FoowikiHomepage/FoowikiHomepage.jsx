import React from "react";
import { CommentCard } from "@/components/CommentCard";
import { DishesCard } from "@/components/DishesCard";
import { NavBar } from "@/components/NavBar";
import { Title } from "@/components/Title";
import { List } from "@/components/List";
import { People1 } from "@/components/People1";
import "./style.css";

export default function FoowikiHomepage(){
  return (
    <div className="foowiki-homepage">
      <div className="div-2">
        <div className="comments-container">
          <Title className="title-instance" text="Recent Comments" />
          <CommentCard className="design-component-instance-node" />
          <CommentCard className="comment-card-instance" />
        </div>
        <div className="recommendation">
          <div className="text-wrapper-9">Recommendation</div>
          <DishesCard className="dishes-card-instance" />
          <DishesCard className="design-component-instance-node" />
        </div>
        <div className="canteens-container">
          <div className="canteen-container">
            <div className="xi-yuan">Xiyuan</div>
            <div className="text-wrapper-10">1st Floor</div>
            <div className="text-wrapper-11">2nd Floor</div>
            <div className="text-wrapper-12">3rd Floor</div>
            <div className="peoples">
              <People1 className="people" />
              <People1 className="people-1" />
            </div>
            <div className="peoples-2">
              <People1 className="people-1-instance" />
              <People1 className="people" />
              <People1 className="people-1" />
            </div>
            <div className="peoples-3">
              <People1 className="people-2" />
              <People1 className="people-1-instance" />
              <People1 className="people" />
              <People1 className="people-1" />
            </div>
          </div>
          <Title className="title-instance" text="Canteens" />
        </div>
        <NavBar className="nav-bar-instance" icon={<List className="list-instance" />} />
      </div>
    </div>
  );
};
