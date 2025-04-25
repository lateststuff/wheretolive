import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function MobilityDiagram() {
  return (
    <div className="font-sans max-w-3xl mx-auto my-8 p-6 bg-blue-50 rounded-xl shadow-md">
      <h2 className="text-xl md:text-2xl font-bold text-blue-900 text-center mb-6">Global Mobility Pathways</h2>
      <ul className="list-none p-0 space-y-4">
        <li className="text-lg font-medium">
          <Link to={`${createPageUrl("MobilityOptions")}#multiple-passports`} className="text-blue-700 hover:text-blue-900 hover:underline transition-colors">
            MULTIPLE PASSPORTS
          </Link>
          <ul className="list-none ml-5 mt-2 space-y-2">
            <li>
              <Link to={`${createPageUrl("MobilityOptions")}#cbi`} className="text-blue-700 hover:text-blue-900 hover:underline transition-colors">
                CITIZENSHIP BY INVESTMENT (CBI)
              </Link>
            </li>
            <li>
              <Link to={`${createPageUrl("MobilityOptions")}#abc`} className="text-blue-700 hover:text-blue-900 hover:underline transition-colors">
                ANCESTRY-BASED CITIZENSHIP (ABC)
              </Link>
            </li>
            <li>
              <Link to={`${createPageUrl("MobilityOptions")}#naturalization`} className="text-blue-700 hover:text-blue-900 hover:underline transition-colors">
                NATURALIZATION
              </Link>
            </li>
          </ul>
        </li>
        
        <li className="text-lg font-medium">
          <Link to={`${createPageUrl("MobilityOptions")}#visas`} className="text-blue-700 hover:text-blue-900 hover:underline transition-colors">
            VISAS OF ALL KINDS
          </Link>
          <ul className="list-none ml-5 mt-2 space-y-2">
            <li>
              <Link to={`${createPageUrl("MobilityOptions")}#digital-nomad`} className="text-blue-700 hover:text-blue-900 hover:underline transition-colors">
                DIGITAL NOMAD VISAS
              </Link>
            </li>
            <li>
              <Link to={`${createPageUrl("MobilityOptions")}#business-visas`} className="text-blue-700 hover:text-blue-900 hover:underline transition-colors">
                BUSINESS/ENTREPRENEUR VISAS
              </Link>
            </li>
            <li>
              <Link to={`${createPageUrl("MobilityOptions")}#retirement-visas`} className="text-blue-700 hover:text-blue-900 hover:underline transition-colors">
                RETIREMENT VISAS
              </Link>
            </li>
            <li>
              <Link to={`${createPageUrl("MobilityOptions")}#work-student-visas`} className="text-blue-700 hover:text-blue-900 hover:underline transition-colors">
                WORK/STUDENT VISAS
              </Link>
            </li>
            <li>
              <Link to={`${createPageUrl("MobilityOptions")}#tourist-visas`} className="text-blue-700 hover:text-blue-900 hover:underline transition-colors">
                TOURIST/SHORT-TERM VISAS
              </Link>
            </li>
          </ul>
        </li>
        
        <li className="text-lg font-medium">
          <Link to={`${createPageUrl("MobilityOptions")}#residencies`} className="text-blue-700 hover:text-blue-900 hover:underline transition-colors">
            RESIDENCIES OF ALL KINDS
          </Link>
          <ul className="list-none ml-5 mt-2 space-y-2">
            <li>
              <Link to={`${createPageUrl("MobilityOptions")}#rbi`} className="text-blue-700 hover:text-blue-900 hover:underline transition-colors">
                RESIDENCY BY INVESTMENT (RBI)
              </Link>
            </li>
            <li>
              <Link to={`${createPageUrl("MobilityOptions")}#tax-residency`} className="text-blue-700 hover:text-blue-900 hover:underline transition-colors">
                TAX-BASED RESIDENCY
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}