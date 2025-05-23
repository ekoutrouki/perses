// Copyright 2023 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { DashboardSpec, PanelDefinition, PanelRef } from '../model';

/**
 * Resolve a PanelRef (JSON reference) against the provided DashboardSpec to
 * a PanelDefinition.
 */
export function resolvePanelRef(spec: DashboardSpec, panelRef: PanelRef): PanelDefinition {
  const panelsKey = getPanelKeyFromRef(panelRef);
  const panelDefinition = spec.panels[panelsKey];
  if (panelDefinition === undefined) {
    throw new Error(`Could not resolve panels reference ${panelRef.$ref}`);
  }
  return panelDefinition;
}

// Currently, panel refs are prefixed with `#/spec/panels/`. If that format changes, we'll definitely need to update
// the code in here relying on it being that format.
const REF_PREFIX_LENGTH = 14;

/**
 * Gets the unique key for a panel from a PanelRef.
 */
export function getPanelKeyFromRef(panelRef: PanelRef): string {
  return panelRef.$ref.substring(REF_PREFIX_LENGTH);
}

/**
 * Creates a PanelRef for a panel with the given key.
 */
export function createPanelRef(panelKey: string): PanelRef {
  return { $ref: `#/spec/panels/${panelKey}` };
}
