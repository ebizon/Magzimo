<div class="wrap" style="max-width:950px !important;">
	<h2>Category Manager</h2>

	<div id="poststuff" style="margin-top:10px;">

	 <div id="mainblock" style="width:710px">

		<div class="dbx-content">
			<form name="CatManager" action="<?php echo $action_url ?>" method="post">
			<input type="hidden" name="submitted" value="1" />

			<?php wp_nonce_field('catmanager-nonce'); ?>

			<h3>Usage</h3>
			<p>This plugin makes category management quicker. Especially if you modify post categories often after posting them </p>
			<br />

			<h3>Options</h3>
			<p>You can choose whether you want the category management widget shows up on the dashboard</p>
			<input type="checkbox" name="ondashboard"  <?php echo $ondash ?> /><label> Show On Dashboard</label>  <br />
			<br />

			<p>You can choose whether you want the category management widget to diplay a confirmation prompt on category removal</p>
			<input type="checkbox" name="showConfirm"  <?php echo $showConfirm ?> /><label> Enable Confirmation dialog</label>  <br />
			<br />

			<p>If you want to be able to change the selected default category on the dashboard without coming to this screen enable the option below</p>
			<input type="checkbox" name="enableDropdown"  <?php echo $enableDropdown ?> /><label> Enable Category drown down list</label>  <br />
			<br />

			<h3> Posts Per Page </h3><label>Show :&nbsp;</label><?php echo $ppplist; ?><br />
			<br />
			
			<h3>Default Taxonomy</h3>
			<p>You can specify the default Taxonomy you wish to show up on the dashboard widget</p>
			
			<?php CategoryManager::render_taxonomyTermSelectionDropDowns(); ?>

			<div class="submit"><input type="submit" name="Submit" value="Update" /></div>
			</form>
		</div>

	 </div>

	</div>

</div>