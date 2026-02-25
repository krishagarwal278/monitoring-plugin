import { listPersesDashboardsPage } from '../../views/perses-dashboards-list-dashboards';

export interface PerspectiveConfig {
  name: string;
  beforeEach?: () => void;
}

export function runCOORBACPersesTestsDevUser4(perspective: PerspectiveConfig) {
  testCOORBACPersesTestsDevUser4(perspective);
}

/**
 * User4 has access to:
 * - empty-namespace4 namespace as persesdashboard-viewer-role and persesdatasource-viewer-role
 * - no access to openshift-cluster-observability-operator, observ-test, perses-dev namespaces, empty-namespace3 namespaces
 * - openshift-monitoring namespace as view role
 */
export function testCOORBACPersesTestsDevUser4(perspective: PerspectiveConfig) {

  it(`1.${perspective.name} perspective - List Dashboards - Namespace validation and Dashboard search`, () => {
    cy.log(`1.1. Namespace validation`);
    listPersesDashboardsPage.noDashboardsFoundState();
    cy.assertNamespace('All Projects', true);
    cy.assertNamespace('openshift-cluster-observability-operator', false);
    cy.assertNamespace('observ-test', false);
    cy.assertNamespace('perses-dev', false);
    cy.assertNamespace('empty-namespace3', false);
    cy.assertNamespace('empty-namespace4', true);
    cy.assertNamespace('openshift-monitoring', true);

    cy.log(`1.2. All Projects validation - Dashboard search - empty state`);
    cy.changeNamespace('All Projects');
    listPersesDashboardsPage.noDashboardsFoundState();
    listPersesDashboardsPage.assertCreateButtonIsDisabled();

    cy.log(`1.3. empty-namespace4 validation - Dashboard search - empty state`);
    cy.changeNamespace('empty-namespace4');
    listPersesDashboardsPage.noDashboardsFoundState();
    listPersesDashboardsPage.assertCreateButtonIsDisabled();

    cy.log(`1.4. openshift-monitoring validation - Dashboard search - empty state`);
    cy.changeNamespace('openshift-monitoring');
    listPersesDashboardsPage.noDashboardsFoundState();
    listPersesDashboardsPage.assertCreateButtonIsDisabled();

  });

  // it(`17.${perspective.name} perspective - Import button validation - Enabled / Disabled`, () => {
  //   // Enabled for openshift-cluster-observability-operator namespace
  //   // Disabled for observ-test namespace
  // });

  // it(`18.${perspective.name} perspective - Import button validation - Enabled - YAML - project and namespace in the file mismatches`, () => {
  //   // Enabled for openshift-cluster-observability-operator namespace
  // });

  // it(`19.${perspective.name} perspective - Import button validation - Enabled - YAML project and namespace in the file matches`, () => {
  //   // Enabled for openshift-cluster-observability-operator namespace
  // });

  // it(`20.${perspective.name} perspective - Import button validation - Enabled - JSON - project and namespace in the file mismatches`, () => {
  //   // Enabled for openshift-cluster-observability-operator namespace
  // });

  // it(`21.${perspective.name} perspective - Import button validation - Enabled - JSON project and namespace in the file matches`, () => {
  //   // Enabled for openshift-cluster-observability-operator namespace
  // });


}